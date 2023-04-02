import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, BeforeUpdate } from 'typeorm';
import { UnitMeasure } from '../enums/units-measures.enum';
import { TypeInventory } from '../enums/type.enum';
@Entity()
@ObjectType()
export class Inventory {
    @PrimaryColumn({ 
        type: 'varchar',
        length: 50 
    })
    @Field((type) => String)
    _id: string;

    @Column()
    @Field()
    description: string;

    @Column({length: 1})
    @Field()
    type: TypeInventory;

    @Column({ type: 'varchar', length: 50, default: '' })
    @Field()
    category?: string;

    @Column({ type: 'varchar', length: 5 })
    @Field()
    um: UnitMeasure;

    @Column({ type: 'varchar', length: 5, default: '' })
    @Field()
    iva?: string;

    @Column({ type: 'varchar', default: '' })
    @Field()
    note?: string;

    @Column({ default: true })
    @Field()
    active_status: boolean;

    @Column({ type: 'integer' })
    @Field()
    createdAt: Date;

    @Column({ type: 'integer' })
    @Field()
    modifiedAt: Date;

}