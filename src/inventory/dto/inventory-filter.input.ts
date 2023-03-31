import { Field, InputType } from '@nestjs/graphql';
import { TypeInventory } from '../enums/type.enum';
import { UnitMeasure } from '../enums/units-measures.enum';
@InputType()
export class InventoryInputFilter {

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    type?: TypeInventory;

    @Field({ nullable: true })
    category?: string;

    @Field({ nullable: true })
    um: UnitMeasure;

    @Field({ nullable: true })
    iva: string;

    @Field({ nullable: true })
    note?: string;

    @Field({ nullable: true })
    active_status?: boolean;
}