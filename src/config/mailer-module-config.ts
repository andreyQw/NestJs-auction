import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const mailerModuleConfig: MailerModule = {
  useFactory: () => ({
    transport: {
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS,
      },
    },
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
  }),
  // transport: {
  //   host: 'localhost',
  //   port: 1025,
  //   ignotTLS: true,
  //   secure: false,
  // },
  // defaults: {
  //   from: 'nestJsModule@gmail.com'
  // },
  // template: {
  //   dir: __dirname + '/templates',
  //   adapter: new PugAdapter(),
  //   options: { strict: true }
  // },
};
