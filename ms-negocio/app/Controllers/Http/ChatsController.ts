import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';

export default class ChatsController {

    // create
    public async store({request}:HttpContextContract){
        let body=request.body();
        const theChat=await Chat.create(body);
        return theChat;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let chats:Chat[]= await Chat.query().paginate(page, perPage)
        return chats;
    }
    public async show({params}: HttpContextContract){
        return Chat.findOrFail(params.id);
    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theChat: Chat = await Chat.findOrFail(params.id);
        theChat.cantidadmiembros= body.quantity;

        return await theChat.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        response.status(204);
        return await theChat.delete();
    }
}
