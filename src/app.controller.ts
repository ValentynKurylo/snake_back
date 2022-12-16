import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("Start")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary:'Hello World'})
  @ApiResponse({status: 200, type: "hello world"})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
