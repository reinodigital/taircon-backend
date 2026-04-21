import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { MailerService } from '../shared/services';

import { CoordinateDto } from './dto/coordinate.dto';
import { IMessage } from 'src/interfaces';

@Injectable()
export class CoordinateService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCoordinateEmail(coordinateDto: CoordinateDto): Promise<IMessage> {
    const {
      name,
      mobile,
      email = null,
      service = null,
      message,
    } = coordinateDto;

    try {
      const body = `
        <h4>
          <p> Client name: ${name} </p> \n 
          <p> Email: ${email} </p> \n 
          <p> Celular: ${mobile ?? 'no presenta'} </p> \n
          <p> Service: ${service ?? 'no presenta'} </p> \n 
          <p> Message: ${message} </p>
        </h4>
      `;

      // Send email
      let subjectComment = `Hi Cesar, a new message has arrived from website tairconcontractor.com.`;
      await this.mailerService.sendEmail(body, subjectComment);

      return {
        msg: `We will contact you as soon as possible. Thanks ${name}.`,
      };
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  // ======= Handle errors =========
  handleErrors(err: any): Promise<any> {
    const statusCode = err.response?.statusCode ?? null;
    if (statusCode === 400 || statusCode === 401) {
      throw new BadRequestException(err.response.message);
    }

    console.error('Error not handled at coordinate.service.ts: ', err);

    throw new InternalServerErrorException(
      'Error not handle yet at coordinate module. Admin check logs.',
    );
  }
}
