import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hall from 'App/Models/Hall';
import Payment from 'App/Models/Payment';
import PaymentValidator from 'App/Validators/PaymentValidator';

export default class PaymentsController {

     // Create
     public async store({request}:HttpContextContract){
        const body = await request.validate(PaymentValidator)
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
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePayment = await Payment.findOrFail(params.id);
            await thePayment.load("suscription")

            return thePayment;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Hall.query().paginate(page, perPage)
            } else {
                return await Hall.query()
            }

        }

    }

     // update
     public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const thePayment: Payment = await Payment.findOrFail(params.id);
        thePayment.valorpagar = body.valorpagar;
        thePayment.cuotas = body.cuotas;
        thePayment.estado = body.estado;

        return await thePayment.save();
    }
    

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const thePayment: Payment = await Payment.findOrFail(params.id);
        response.status(204);
        return await thePayment.delete();
    }
    
}


