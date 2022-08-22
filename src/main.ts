import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as hbs from 'hbs';
import { NotFoundExceptionFilter } from './http-exception.filter';
import flash = require('connect-flash');
import * as session from 'express-session';
import * as passport from 'passport';
import * as hbsRegister from './hbs.register'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const PORT = process.env.PORT;
 
  app.useStaticAssets(join(__dirname, '..', 'public'),{prefix:'/public'});
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  require("./hbs.register").register(hbs);
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  
  // app.setViewEngine('hbs');
  app.useGlobalFilters(new NotFoundExceptionFilter());

  const config = new DocumentBuilder()
  .setTitle('API documentation')
  .setDescription('This is documentation for API')
  .setVersion('1.0')
  .addTag('API V1')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
//increase size of body in case upload to many images
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.enableCors();
  await app.listen(PORT);

  
  
}
bootstrap();
