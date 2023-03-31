import { Field, InputType } from '@nestjs/graphql';
import { TypeInventory } from '../enums/type.enum';
import { UnitMeasure } from '../enums/units-measures.enum';
@InputType()
export class InventoryInput {
    @Field()
    _id: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    type?: TypeInventory;

    @Field({ nullable: true })
    category?: string;

    @Field()
    um: UnitMeasure;

    @Field()
    iva: string;

    @Field({ nullable: true })
    note?: string;
}