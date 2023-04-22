const fs = require('fs')
const booklist = require('./notes.json');
const prompt = require('prompt-sync')({sigint: true})
const { v4: uuidv4 } = require('uuid');

console.log(uuidv4())
const run = () => {

    let isbn = prompt('Enter Books ISBN......  ')
    let month = prompt('Which Month is it for?...  ')
    bookGen(isbn, month)
}


const bookGen = async function (isbn, month) {

    // API get JSON from book ISBN
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const data = await res.json();
    const bookInfo = data.items[0].volumeInfo
    console.log(bookInfo)
    // Get Key Objects from API
    //bookInfo['month'] = month     
    const {title, authors, publishedDate, description, pageCount, categories, imageLinks} = bookInfo
    const infokeep = {title, authors, publishedDate, description, pageCount, categories, imageLinks}
    booklist[month] = infokeep
       // booklist[title] = infokeep
    
        console.log(booklist)
    
    
    // Write to File called Notes.json
       const bookstring = JSON.stringify(booklist)
       fs.writeFileSync('notes.json', bookstring)
    
}
// testt()

//bookGen(9780140445466) // Paul and Virginia
//bookGen(9780156001311) // Name of the Rose
//bookGen(9781784701994) // When Breath becomes air

run()