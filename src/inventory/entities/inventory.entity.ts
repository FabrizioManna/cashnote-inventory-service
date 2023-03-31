import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
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

    @Column({ type: 'varchar', length: 50, nullable: true, default: null })
    @Field()
    category: string;

    @Column({ type: 'varchar', length: 5 })
    @Field()
    um: UnitMeasure;

    @Column({ type: 'varchar', length: 5, nullable: true, default: null })
    @Field()
    iva: string;

    @Column({ nullable: true, default: null })
    @Field()
    note: string;

    @Column({ default: true })
    @Field()
    active_status: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    modifiedAt: Date;

    @Column({ nullable: true, default: null })
    @Field()
    deleteAt: Date;

}