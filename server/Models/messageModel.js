const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  });

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;

/*mongoose.model('Message', messageSchema);: Dieser Aufruf erstellt ein neues Modell in Mongoose.
mongoose.model: Ist eine Methode von Mongoose, die verwendet wird, um ein Modell zu definieren. Ein Modell repräsentiert eine Sammlung in der MongoDB-Datenbank und agiert als Schnittstelle für die Interaktion mit der Datenbank.
'Message': Der erste Parameter der model-Methode ist der Name des Modells. Dieser Name definiert auch, wie die zugehörige Sammlung in der MongoDB-Datenbank genannt wird. Mongoose konvertiert standardmäßig den Namen in Pluralform, also wird für das Message-Modell eine Sammlung namens messages in der Datenbank verwendet.
  messageSchema: Der zweite Parameter gibt das Schema an, das dieses Modell verwenden wird. Dieses Schema definiert die Struktur der Dokumente in der Sammlung, einschließlich der Datentypen und anderer Einschränkungen.
*/