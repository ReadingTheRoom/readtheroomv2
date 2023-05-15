const express = require('express')
const app = express()
const bookjson = require('./notes.json')
const path = require('path')

const reviews = {
    "ac112f92-83e1-4186-8f2f-43196f9e9c5b": [{ member: "Ethan", rank: 4.5, comment: "I love this book I really enjoyed it, I do sympathise there were some sections that were quite long, nevertheless I wouldn't say I was bored or frustrated in the whole. I think it was really fun and fascinating. I did enjoy the plot, but I did enjoy the other stuff just as much if not more. It was a fun world to live in, the characters were fun to hang out with" },
    { member: "Lachlan", rank: 3.5, comment: "At times the passing was slow, but there was enough to string you along to and see the resolution, I enjoyed it, I enjoyed the story and the context of the story. I wish William was my best friend" },
    { member: "Harry", rank: 3.5, comment: "I think I digested it the same as Toby as I wanted to believe he was the writer, I think the real positive for me was the language used and the way it was written as you never hear people talk like that these days and we have lost alot of language and maybe even they thought about things more critically to engage in discussions. Yeah, the plot was a good murder mystery but I liked the other stuff more. Its like going to the shops and on the way you see a random mailbox and tell a page story about the mailbox, but then the mailbox is the best part of the story. I really like the descriptions and the way the deaths were happens until it seems like they took a easier way at the end but maybe thats reality sometimes there's no bigger reason behind things" },
    { member: "Shane", rank: 2.5, comment: "Similar to what brenno said I enjoyed it particuarly the story and the word choices and language used I quite enjoyed. The writing style while there was list and things that detracted me from the story I'm happy I read it. I wasn't engaged for the entirety of the book, so it was fine in sittings, but I couldn't sit down and read it in a weekend" },
    { member: "Riley", rank: 4.5, comment: "I don't think everything is important in the sense of the plot, but everything is important in the context of a power struggle for knowledge when none of them actually know anything which I thought was cool, I really liked the ending and I'm a sucker for the injections of Latin and things I don't necessarily understand. I think its really well written and if anything just it feeling like your reading from someone in this setting as toby found out, I really enjoyed it and the theological discussion it had probably more so then the plot. The plot was relatively good as a murder mystery goes but the theological discussions I thought was really cool" },
    { member: "Jayson", rank: 3, comment: "I think I would have enjoyed it more if I did the reverse of Audio book for first half and read the second half. I think the slow pacing at the start the audiobook would have gotten me through it. I thought it was a good book, it was a good mystery, especially some of the earlier parts like william explaining the clues about the horse drew you in with the medieval Sherlock Holmes. I think I found the opposite of others and felt everything wasn't and didn't know in some parts if this was important or if the author was boasting his early theological knowledge " },
    { member: "Toby", rank: 3.5, comment: "Glad I read it, I found alot of elements of it satisfying. Defiantly changed my perception, it wasn't factually correct. Probably should have paid more attention to that. There is alot of elements you could imagine happen in real life especially around Inquisition it was well written and you could image it could be written in " }],
    "8f9a8ca1-6ea4-4592-b0c8-6d88e02a9dfb": [{ member: "Ethan", rank: 3, comment: "" }, { member: "Lachlan", rank: 1, comment: "" }, { member: "Harry", rank: 2, comment: "" }, { member: "Shane", rank: 1, comment: "" }, { member: "Riley", rank: 3, comment: "" }, { member: "Jayson", rank: 1.5, comment: "" }, { member: "Toby", rank: 1.5, comment: "" }, { member: "Mulli", rank: 2, comment: "" }],
    "b7b0f2c3-970e-4641-8257-f8de288a0631": [{ member: "Ethan", rank: 2.5, comment: "" }, { member: "Lachlan", rank: 2.5, comment: "" }, { member: "Harry", rank: 5, comment: "" }, { member: "Shane", rank: 3.5, comment: "" }, { member: "Riley", rank: 3.5, comment: "" }, { member: "Jayson", rank: 5, comment: "" }, { member: "Toby", rank: 4.5, comment: "" }, { member: "Mulli", rank: 4.5, comment: "" }],


};



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.listen(3000, () => {
    console.log("server running")
})


app.get('/', (req, res) => {
    res.render('home', { bookjson })
})

app.get('/book/:id', (req, res) => {
    const { id } = req.params;
    const book = bookjson[id];
    const comments = reviews[id];
    if (comments) {
        let total = 0;
        for (const m of comments) {
            total += m.rank;
        }

        let avgrank = (total / comments.length).toFixed(1);
        console.log(total)
        res.render('booksingle', { ...book, comments, avgrank })
    }
    res.render('booksingle', { ...book, comments })
})