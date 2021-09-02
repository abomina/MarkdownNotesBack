import * as fs from 'fs/promises';

export const getAllNotes = async () => {
    var data = await fs.readFile("./data/notes.json");
    var notes = JSON.parse(data);
    return notes;
}

export const createNote = async (text) => {
    try {
        var data = await fs.readFile("./data/notes.json");
        var notes = JSON.parse(data);
        var textsplit = text.split(" ")
        var countwords = textsplit.length
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        notes.push({
            "id": notes[notes.length-1].id + 1,
            "body": text,
            "date": today,
            "words": countwords
        })
        await fs.writeFile("./data/notes.json",JSON.stringify(notes),{encoding:'utf8',flag:'w'});
        return {
            status: true,
            data: ""
        }
    }catch (err){
        return {
            status: false,
            data: ""
        }
    }
}

export const findNote = async (id) => {
    var data = await fs.readFile("./data/notes.json");
    var notes = JSON.parse(data);
    var note = notes.find( nota => nota.id == id);
    if (note) {
        return {
            status: true,
            data: note
        };
    }else{
        return {
            status: false,
            data: ""
        };
    }
}

export const deleteNote = async (id) => {
    var data = await fs.readFile("./data/notes.json");
    var notes = JSON.parse(data);
    var item = -1;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            item=i;
        }
    }
    if (item > -1) {
        notes.splice(item,1);
        await fs.writeFile("./data/notes.json",JSON.stringify(notes),{encoding:'utf8',flag:'w'});
        return {
            status: true,
            data: ""
        };
    }else{
        return {
            status: false,
            data: ""
        };
    }
}