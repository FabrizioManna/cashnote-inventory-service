import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { InventoryModule } from './inventory.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Inventory } from './entities/inventory.entity';
import { TypeInventory } from './enums/type.enum';
import { UnitMeasure } from './enums/units-measures.enum';
import { faker } from '@faker-js/faker';
import { async } from 'rxjs';

describe('Test (e2e) Inventory Module', () => {
    let app: INestApplication;
    const entrypoint = '/graphql';
  
    beforeAll(async () => {
        
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: 'db.sqlite',
                    entities: [Inventory],
                    synchronize: true,
                }),

                GraphQLModule.forRoot<ApolloDriverConfig>({
                    driver: ApolloDriver,
                    autoSchemaFile: true,
                    playground: false,
                }),
                
                InventoryModule,
            ],
        }).compile(); 

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    }); 

    describe('Inventory Module Tests', () => {
        let createData: InventoryInterface | any;
        interface InventoryInterface {

            _id: string;
            description: string;
            type: TypeInventory;
            category?: string;   
            um: UnitMeasure;
            iva?: string;
            note?: string;

        } 

        const inventory: InventoryInterface = {
            _id: faker.datatype.string(5),
            description: faker.lorem.words(6),
            type: TypeInventory.GOOD,
            um: UnitMeasure.PIECES,
            iva: "22",
            note: faker.lorem.words(15)
        };

        it('Create Inventory', async () => {

            const createInventoryMutation = `
                mutation createInventory {
                    createInventory(
                        inventoryInput: {
                            _id: "${inventory._id}"
                            description: "${inventory.description}"
                            type: "${inventory.type}"
                            um: "${inventory.um}"
                            iva: "${inventory.iva}"
                            note: "${inventory.note}"
                        }
                    ) {
                        _id
                        description
                        type
                        category
                        um
                        iva
                        note
                    }
                }
            `;

            const response = await request(app.getHttpServer())
                .post(entrypoint)
                .send({ query: createInventoryMutation })
                .expect(200)
                .expect(res => {
                    expect(res.body.errors).toBeFalsy();
                    expect(res.body.data).toBeDefined();
                    expect(res.body.data.createInventory).toBeDefined();
                    expect(res.body.data.createInventory._id).toBeDefined();
                });

            createData = response.body.data.createInventory;
        });

        it('Get All Invectory', async () => {
            const getAllInventoryMutation = `
                query {
                    getAllInventorys {               
                        _id
                        description
                        type
                        category
                        um
                        iva
                        note
                    }
                }
            `;

            const response = await request(app.getHttpServer())
                .post(entrypoint)
                .send({ query: getAllInventoryMutation })
                .expect(200)
                .expect(res => {
                    expect(res.body.errors).toBeFalsy();
                    expect(res.body.data).toBeDefined();
                    expect(res.body.data.getAllInventorys.length).not.toBe(0);
                });
        });

        it('Get Inventory By ID', async () => {
            const getInventoryByIDMutation = `
                query {
                    getInventoryById(_id: "${createData._id}") {
                        _id
                        description
                        type
                        category
                        um
                        iva
                        note
                    }
                }
            `;

            const response = await request(app.getHttpServer())
                .post(entrypoint)
                .send({ query: getInventoryByIDMutation })
                .expect(200)
                .expect(res => {
                    expect(res.body.errors).toBeFalsy();
                    expect(res.body.data).toBeDefined();
                    expect(res.body.data.getInventoryById).toMatchObject(createData);
                });
        });

        it('Update Inventory Data', async () => {
            
            createData.description = faker.lorem.words(1);
            createData.note = faker.lorem.words(30);
            
            const updateDataMutation = `
                mutation {
                    updateInventory(
                        _id: "${createData._id}"
                        updateInventoryData: {
                            description: "${createData.description}"
                            note: "${createData.note}"
                        }
                    ) {
                        _id
                        description
                        type
                        category
                        um
                        iva
                        note
                    }
                }
            `;

            const response = await request(app.getHttpServer())
                .post(entrypoint)
                .send({ query: updateDataMutation })
                .expect(200)
                .expect(res => {
                    expect(res.body.errors).toBeFalsy();
                    expect(res.body.data).toBeDefined();
                    expect(res.body.data.updateInventory.length).not.toBe(0);
                    expect(res.body.data.updateInventory).toMatchObject(createData);
                });
        });

        it('Delete Inventory Data', async () => {
            const deleteInventoryMutation = `
                mutation {
                    deleteInventory(_id: "${createData._id}")
                }
            `;

            const response = await request(app.getHttpServer())
                .post(entrypoint)
                .send({ query: deleteInventoryMutation })
                .expect(200)
                .expect(res => {
                    expect(res.body.errors).toBeFalsy();
                    expect(res.body.data.deleteInventory).toBe(true);
                });  
        });
    });
});