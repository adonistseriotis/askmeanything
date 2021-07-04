import { Controller } from '@nestjs/common';
import { AnalyticsService} from './analytics.service';
import {Response} from 'express'
const url = require('url');

@Controller()
export class AnalyticsController {
    constructor (private readonly analyticsService: AnalyticsService) {}



}
