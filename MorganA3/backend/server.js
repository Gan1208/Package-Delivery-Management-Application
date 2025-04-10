// Reference
// https://www.youtube.com/watch?v=Z8F6FvMrN4o&t=449s
// https://cloud.google.com/translate/docs/reference/libraries/v2/nodejs
// https://stackoverflow.com/questions/19948816/passport-js-error-failed-to-serialize-user-into-session
// https://www.geeksforgeeks.org/node-js-fs-readfile-method/

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require("firebase-admin");
const { Server } = require('socket.io');
const http = require('http');
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const textToSpeech = require("@google-cloud/text-to-speech");
const { Translate } = require('@google-cloud/translate').v2;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("./models/user");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(cors());
app.use(express.static('./dist/morgana3/browser'));
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


const serviceAccount = require("../fit2095-7be5e-firebase-adminsdk-oj8eq-1222426642 (1).json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
});


const client = new textToSpeech.TextToSpeechClient();
const translateClient = new Translate();


async function connect() {
    await mongoose.connect('mongodb://localhost:27017/A3');
}
connect();


async function initCounter() {
    await db.collection("counters").doc("CRUDOperations").set({
        insert: 0,
        get: 0,
        update: 0,
        delete: 0
    });
    console.log("counter has been set.");
}
initCounter();


const driverRouter = require('./routes/driver-routes');
const packageRouter = require('./routes/package-routes');


app.use('/api/v1/drivers', driverRouter);
app.use('/api/v1/packages', packageRouter);

app.get("/api/v1/stats", async function (req, res) {
    let counters = await db.collection("counters").doc("CRUDOperations").get();
    res.status(200).json({
        numberOfInsert: counters.get("insert"),
        numberOfGet: counters.get("get"),
        numberOfUpdate: counters.get("update"),
        numberOfDelete: counters.get("delete")
    });
});

app.get("/api/v1/auth/status", function (req, res) {
    if (req.session && req.session.login) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    googleId: profile.id
                });
                await user.save();
            }
            return done(null, user);

        } catch (err) {
            return done(err, null);
        }
    }
));


app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        req.session.login = true;
        res.redirect('/');
    });


io.on('connection', (socket) => {
    console.log("New connection established");


    socket.on("translationEvent", async (targetLanguage, textToTranslate) => {
        try {
            const [translation] = await translateClient.translate(textToTranslate, targetLanguage);


            socket.emit("serverTranslationEvent", {
                text: textToTranslate,
                targetLanguage: targetLanguage,
                translation: translation.toString()
            });

        } catch (error) {
            console.error("Translation Error:", error);
            socket.emit("serverTranslationEvent", {
                text: textToTranslate,
                targetLanguage: targetLanguage,
                translation: "Translation failed"
            });
        }
    });


    socket.on("speechEvent", async (driverLicence) => {

        const request = {
            input: { text: `Licence ${driverLicence}` },
            voice: { languageCode: "en-UK", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" }
        };

        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error("Text-to-Speech ERROR:", err);
                return;
            }

            const randomFileName = `audio_${Date.now()}.mp3`;
            const filePath = path.join(__dirname, randomFileName);

            fs.writeFile(filePath, response.audioContent, "binary", err => {
                if (err) {
                    console.error("File Write ERROR:", err);
                    return;
                }

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.error("File Read ERROR:", err);
                        return;
                    }

                    socket.emit("serverSpeechEvent", {
                        data: data,
                        contentType: "audio/mp3"
                    });
                });
            });
        });
    });


    socket.on("generativeAIEvent", async (packageDestination) => {
        const question = `Give me the answer of calculating the distance between ${packageDestination} and Melbourne in Kilometers`;
        const result = await geminiModel.generateContent(question);
        const response = await result.response.text();
        socket.emit("serverGenerativeAIEvent", response);
    });
});


server.listen(8080, () => {
    console.log("Server is running on port 8080");
});

