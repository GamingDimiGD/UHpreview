import express from 'express';
import fs from 'fs';
import path from 'path';
import colors from 'ansi-colors';
import { rateLimit } from 'express-rate-limit'
import Database from "@replit/database"
import jwt from "jsonwebtoken"
const app = express()
const db = new Database()
const port = 3000;
const API_KEY = process.env['PROMOCODE_API_KEY']
const SECRET = process.env['SECRET_KEY']
const USERNAME = process.env['USERNAME']

db.set('promocodes', [])

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' }); 
  }
  try {
    const secretKey = API_KEY
    jwt.verify(token, secretKey); 
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden' });
  }
};

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 1000, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

app.use(limiter)
app.use('/css', express.static('front/css'))
app.use('/scripts', express.static('front/scripts'))
app.use('/images', express.static('front/images'))
app.use('/sfx', express.static('front/sfx'))
app.use(express.json())
app.set("trust proxy", 2)

fs.readFile('front/index.html', 'utf8', (err, data) => {
  if (err) {
    console.error(`error at index.html:` + colors.red(err));
    return;
  }
  app.get('/', (req, res) => {
    res.send(data);
  });
})

const htmlPath = 'front/html'

fs.readdir(htmlPath, (err, files) => {
  if (err) {
    console.error(`error at ${file} ` + colors.red(err));
    return;
  }

  files.forEach(file => {
    const filePath = path.join(htmlPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${file}:`, err);
      } else {
        console.log(colors.green(`[HTML FILES] loaded ${file}`))
        app.get(`/html/${file}`, (req, res) => {
          res.send(data);
        })
      }
    });
  });
});

app.post('/api/login', async (req, res) => {
  let { username, password } = req.body
  if (username !== USERNAME && password !== SECRET) return res.status(401).json({ error: 'get rejected lol' });
  const payload = { 
    userId: 'gamingdimigd', 
    username: 'GamingDimiGD', 
    role: 'idk' 
  };
  const token = jwt.sign(payload, API_KEY, { expiresIn: '1h' });
  res.status(200).json({
    message: 'hi dimi hru today (rember it exps at 1 hor)',
    token: token,
  })
})

app.post(`/api/promocodes`, async (req, res) => {
  const { promocode } = req.body;
  if (!promocode) {
    res.status(418).send({ error: "Promocode is required" });
    return;
  }
  res.status(200).send({ valid: "true" })
})

app.post('/api/promocodes-create', authenticateToken, async (req, res) =>　{
  try {
    const { promocode, rewardsFunction } = req.body
    if(!promocode || !rewardsFunction) {
      res.status(418).send({ error: "missing arguments i think" })
      return
    }
    let promocodes = await db.get('promocodes')
    if(!promocodes.ok){
      await db.set('promocodes', [])
      promocodes = await db.get('promocodes')
    }
    let promocodeObject = { promocode, rewardsFunction: rewardsFunction }
    if(promocodes.value.includes(promocodeObject) || promocodes.value.find(value => value.promoode === promocode.promocode)) return res.status(418).send({ error: "bruh why u add duplicate promocodes things are going to break lol (i saved u from that)" })
    promocodes.value.push(promocodeObject)
    await db.set('promocodes', promocodes.value)
    console.log(await db.get('promocodes'))
    res.status(200).send({ success: "true", promocode: promocodeObject })
  } catch(error) {
    res.status(500).send({ error: "error creating promocode" })
    console.log(colors.red(`error: ${error}`))
  }
})

app.listen(port, () => {
  console.log(`Unhinged Hangman is on ${port}`);
});