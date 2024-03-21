# lyricreader

FL Studio has a Fruity Notebook and Fruity Notebook 2 both of which only display text without any font customization.
I wanted to see my lyrics inside FL Studio with the customizations I do. I did not want to open a file else where and constantly switch back to read.

With this setup, I can run a single command which opens up a text-editor (VS Code) and shows the converted HTML of my markdown lyrics in FL Studio (given that I configured my index.html path inside FL).
```
Usage: lyricreader [filename] [options]
Options:
  -h    Show help
  -a    Show all files in the lyrics directory
  -y    Agree to create new file
  -V    Verbose
```
```batch
lyricreader my-very-beautiful-song
```

This will make `my-very-beautiful-song.md` and save it in `./lyrics/`.
The command will also start [nodemon](https://www.npmjs.com/package/nodemon) which listens for changes in the `.md` file.

I have a preset in FL Studio for Fruity HTML Notebook which opens `./public/index.html`.

Now, index.js will contain the most recent project's lyrics.
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
P.S.

Please juse an external text editor instead of going through this garbage.
