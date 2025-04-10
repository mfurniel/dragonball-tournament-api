import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { ApiFormatter } from '../common/api-responses/api-formatter.interceptor';
import { PaginationInterceptor } from '../common/pagination/pagination.interceptor';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/')
  @UseInterceptors(ApiFormatter, PaginationInterceptor)
  getAllTournaments(@Query() paginationRequestDto: PaginationRequestDto) {
    return this.tournamentService.getAllTournaments(paginationRequestDto);
  }
}
