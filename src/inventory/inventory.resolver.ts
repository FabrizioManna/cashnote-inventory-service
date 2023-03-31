import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inventory } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';
import { NotFoundException } from '@nestjs/common';
import { InventoryInput } from './dto/inventory.input';


@Resolver((of) => Inventory)
export class InventoryResolver {
    constructor(
        private inventoryService: InventoryService
    ) {}

    @Query((type) => [Inventory])
    async getAllInventorys() {
        return this.inventoryService.getAllInventorys();
    }

    @Mutation((returns) => Inventory)
    createInventory(
        @Args('inventoryInput') inventoryInput: InventoryInput
    ) {
        return this.inventoryService.createInventory(inventoryInput);
    }

}
