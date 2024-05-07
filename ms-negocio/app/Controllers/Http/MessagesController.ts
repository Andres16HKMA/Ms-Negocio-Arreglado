import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';

export default class MessagesController {
    public async store({request}:HttpContextContract){
        let body = request.body();
        const theMessage=await Message.create(body)
        return theMessage;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let message:Message[]=await Message.query().paginate(page, perPage)
        return message;
    }
    public async show({params}:HttpContextContract){
        return Message.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theMessage: Message = await Message.findOrFail(params.id);
        theMessage.addressee = body.addressee;
        theMessage.sender = body.sender;
        theMessage.body = body.body;
        theMessage.state = body.state;
        return theMessage.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theMessage: Message = await Message.findOrFail(params.id);
        response.status(204);
        return theMessage.delete()
    }
}
