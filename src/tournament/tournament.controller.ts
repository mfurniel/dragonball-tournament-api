import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { ApiFormatter } from '../common/api-responses/api-formatter.interceptor';
import { PaginationInterceptor } from '../common/pagination/pagination.interceptor';
import { FeatureFlagGuard } from '../common/features-flags/feature-flag.guard';
import { FeatureFlag } from '../common/features-flags/feature-flag.decorator';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get All Tournaments' })
  @ApiOkResponse({
    description: 'List of tournaments with pagination info',
  })
  @FeatureFlag('FEATURE_TOURNAMENTS_GET_ALL_TOURNAMENTS')
  @UseGuards(FeatureFlagGuard)
  @UseInterceptors(ApiFormatter, PaginationInterceptor)
  getAllTournaments(@Query() paginationRequestDto: PaginationRequestDto) {
    return this.tournamentService.getAllTournaments(paginationRequestDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Tournament for ID' })
  @FeatureFlag('FEATURE_TOURNAMENTS_GET_TOURNAMENT')
  @UseGuards(FeatureFlagGuard)
  @UseInterceptors(ApiFormatter, PaginationInterceptor)
  getTournament(@Param('id') id: string) {
    return this.tournamentService.getTournament(id);
  }
}
