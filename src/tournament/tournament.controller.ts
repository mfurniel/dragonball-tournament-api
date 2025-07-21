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

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/')
  @FeatureFlag('FEATURE_TOURNAMENTS_GET_ALL_TOURNAMENTS')
  @UseGuards(FeatureFlagGuard)
  @UseInterceptors(ApiFormatter, PaginationInterceptor)
  getAllTournaments(@Query() paginationRequestDto: PaginationRequestDto) {
    return this.tournamentService.getAllTournaments(paginationRequestDto);
  }
}
