import { PartialType } from '@nestjs/swagger';
import { CreateWarriorDto } from './create-warrior.dto';

export class UpdateWarriorDto extends PartialType(CreateWarriorDto) {}
