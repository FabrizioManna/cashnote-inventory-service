import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { InventoryResolver } from './inventory.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Inventory]),
    ],
    providers: [InventoryService, InventoryResolver]
})
export class InventoryModule {}
