import { Field, InputType } from '@nestjs/graphql';
import { TypeInventory } from '../enums/type.enum';
import { UnitMeasure } from '../enums/units-measures.enum';
@InputType()
export class InventoryInput {
    @Field()
    _id: string;

    @Field()
    description: string;

    @Field()
    type?: TypeInventory;

    @Field()
    category?: string;

    @Field()
    um: UnitMeasure;

    @Field()
    iva: string;

    @Field()
    note?: string;
}