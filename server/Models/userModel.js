// Einbinden von Mongoose, einem ODM (Object Document Mapper) für MongoDB
const mongoose = require('mongoose');

// Erstellen eines Schemas für User-Daten
// Ein Schema definiert die Struktur der Dokumente innerhalb einer MongoDB-Kollektion

const userSchema = new mongoose.Schema({
    name: {type: String, require: true, minlegth: 3, maxlength: 30},
    email: {type: String, require: true, minlegth: 3, maxlength: 200, unique: true},
    password: {type: String, require: true, minlegth: 3, maxlength: 1024}
},
{
    timestamps: true
}
);
// Erstellen eines Modells basierend auf dem Schema
// Ein Modell stellt eine Sammlung in der MongoDB dar und wird verwendet, um Daten zu erstellen, abzurufen, zu aktualisieren und zu löschen.
const userModel = mongoose.model("User", userSchema);

// Exportieren des Modells, damit es in anderen Teilen der Anwendung verwendet werden kann
module.exports = userModel;

