import { AddMessage } from "./main.js"
const UserNameInput = document.getElementById('userName');
export let Endpoint = "https://openchatroom.glitch.me/get/messages/"
export class OCRClient {
    constructor() {
        this.Messages = []
        this.NewMessages = [
            //["UUID","USERNAME","MESSAGE","VERIFIED"]
        ]
        if (localStorage.getItem("endpoint")){
            Endpoint = localStorage.getItem("endpoint") + "/get/messages/"
        }
    }
    FetchMessages() {
        this.NewMessages = []
        let NewMessagesV = this.NewMessages // Really dumb work around
        let MessagesV = this.Messages
        const xhttp = new XMLHttpRequest()
        //xhttp.onload = function() {this.RecvMessages(this)}
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const Data = this.responseText
                let Array = JSON.parse(Data)
                for (let i in Array) {
                    var Object = Array[i]
                    var UUID = Object[0]
                    var User = Object[1]
                    var Text = Object[2]
                    var Verified = Object[3]
                    var AuthType = Object[4]
                    let Found = false
                    let FormattedUser = ""
                    //console.log("AuthType: "+AuthType)
                    if (AuthType == "" || AuthType == "null"){
                        FormattedUser = `[guest] ${User}`
                    } else {
                        FormattedUser = `[${AuthType}] ${User}`
                    }
                    for (let n in MessagesV) {
                        var SearchObject = MessagesV[n]
                        if (UUID == SearchObject[0]) {
                            Found = true
                        }
                    }
                    if (!Found) {
                        console.log("Found New Message: " + UUID)
                        MessagesV.push([UUID, User, Text])
                        NewMessagesV.push([UUID, User, Text])
                        if (User == UserNameInput.value.trim()) {
                            AddMessage(FormattedUser, Text, "sentmessage")
                        } else {
                            if (AuthType == "" || AuthType == "null"){
                                AddMessage(FormattedUser, Text, "untrustmessage")
                            } else {
                                if (AuthType == "owner"){
                                    AddMessage(FormattedUser,Text,"ownermessage")
                                } else {
                                    AddMessage(FormattedUser, Text, "message")
                                }
                            }
                        }
                    }
                }
            }
        };
        this.NewMessages = NewMessagesV
        this.Messages.concat(MessagesV)
        xhttp.open("GET", Endpoint)
        xhttp.send()
        return NewMessagesV
    }
    ReturnMessages() {
        return this.NewMessages
    }
}