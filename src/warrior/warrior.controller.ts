import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { WarriorService } from './warrior.service';
import { CreateWarriorDto } from './dto/create-warrior.dto';
import { UpdateWarriorDto } from './dto/update-warrior.dto';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { WarriorDto } from './dto/warrior.dto';
import { plainToInstance } from 'class-transformer';
import { ApiFormatter } from '../common/api-responses/api-formatter.interceptor';
import { PaginationInterceptor } from '../common/pagination/pagination.interceptor';
import { FeatureFlagGuard } from '../common/features-flags/feature-flag.guard';
import { FeatureFlag } from '../common/features-flags/feature-flag.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from '@nestjs/common';
import { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';

@Controller('warrior')
@UseInterceptors(ApiFormatter)
@UseGuards(FeatureFlagGuard)
export class WarriorController {
  constructor(private readonly warriorService: WarriorService) {}

  @Post()
  @FeatureFlag('FEATURE_WARRIORS_CREATE_WARRIOR')
  create(@Body() createWarriorDto: CreateWarriorDto) {
    return this.warriorService.create(createWarriorDto);
  }

  @Get()
  @FeatureFlag('FEATURE_WARRIORS_GET_ALL_WARRIORS')
  @UseInterceptors(PaginationInterceptor)
  async findAll(@Query() paginationRequestDto: PaginationRequestDto) {
    const data = await this.warriorService.findAll(paginationRequestDto);

    const warriors = plainToInstance(WarriorDto, data, {
      excludeExtraneousValues: true,
    });

    return warriors;
  }

  @Get(':id')
  @FeatureFlag('FEATURE_WARRIORS_GET_WARRIOR')
  async findOne(@Param('id') id: string): Promise<WarriorDto> {
    const data = await this.warriorService.findOne(id);

    const warrior = plainToInstance(WarriorDto, data, {
      excludeExtraneousValues: true,
    });

    return warrior;
  }

  @Patch(':id')
  @FeatureFlag('FEATURE_WARRIORS_UPDATE_WARRIOR')
  update(@Param('id') id: string, @Body() updateWarriorDto: UpdateWarriorDto) {
    return this.warriorService.update(id, updateWarriorDto);
  }

  @Delete(':id')
  @FeatureFlag('FEATURE_WARRIORS_DELETE_WARRIOR')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.warriorService.remove(id, req.user.userId);
  }
}
