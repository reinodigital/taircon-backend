import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CoordinateModule } from 'src/modules/coordinate/coordinate.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // allow to use .env environment variables

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),

    CoordinateModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
