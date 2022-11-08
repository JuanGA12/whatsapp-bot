const sendMessage = async (client, number = null, text = null) => {
    try {
        setTimeout(async () => {
            client.sendMessage(number, text);
            },170)
        return {status:true,message:"Mensaje enviado a "+number}
    } catch (error) {
        return {status:false,message:"No se envio mensaje a "+number+" error: "+error}
    }
}
module.exports = { sendMessage}