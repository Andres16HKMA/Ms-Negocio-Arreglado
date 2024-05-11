import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';

export default class PaymentsController {

     // Create
     public async store({request}:HttpContextContract){
        let body=request.body();
        const thePayment=await Payment.create(body);
        return thePayment;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let payments:Payment[]= await Payment.query().paginate(page, perPage)
        return payments;
    }
    public async show({params}: HttpContextContract){
        return Payment.findOrFail(params.id);
    }

     // update
     public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const thePayment: Payment = await Payment.findOrFail(params.id);
        thePayment.payment_status = body.payment_status;
        return await thePayment.save();
    }
    

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const thePayment: Payment = await Payment.findOrFail(params.id);
        response.status(204);
        return await thePayment.delete();
    }
    
}


