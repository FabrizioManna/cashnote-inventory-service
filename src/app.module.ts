import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Inventory } from './inventory/entities/inventory.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Inventory],
      synchronize: true
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.GRAPHQL_PLAY === 'true' ? true : false || true,
    }),

    InventoryModule,

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
