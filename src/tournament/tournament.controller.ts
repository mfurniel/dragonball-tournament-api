import {
  Controller,
  Get,
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
import { TournamentsGetAllDto } from '../common/pagination/dto/get-all-responses/tournaments-get-all.dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}
  @Get('/')
  @ApiOperation({ summary: 'Get All Tournaments' })
  @ApiOkResponse({
    description: 'List of tournaments with pagination info',
    type: TournamentsGetAllDto,
  })
  @FeatureFlag('FEATURE_TOURNAMENTS_GET_ALL_TOURNAMENTS')
  @UseGuards(FeatureFlagGuard)
  @UseInterceptors(ApiFormatter, PaginationInterceptor)
  getAllTournaments(@Query() paginationRequestDto: PaginationRequestDto) {
    return this.tournamentService.getAllTournaments(paginationRequestDto);
  }
}
