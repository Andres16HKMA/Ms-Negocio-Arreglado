import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment';
import CommentValidator from 'App/Validators/CommentValidator';

export default class CommentsController {
    public async store({request}:HttpContextContract){
        const body = await request.validate(CommentValidator)
        const theComments=await Comment.create(body)
        return theComments;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let comment:Comment[]=await Comment.query().paginate(page, perPage)
        return comment;
    }
    public async show({params}:HttpContextContract){
        return Comment.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theComment: Comment = await Comment.findOrFail(params.id);
        theComment.body = body.body;
        return theComment.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theComment: Comment = await Comment.findOrFail(params.id);
        response.status(204);
        return theComment.delete()
    }
}
