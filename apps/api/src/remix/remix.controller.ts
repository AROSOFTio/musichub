import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";

import { AuthenticatedUser, CurrentUser } from "../auth/decorators/current-user.decorator";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";
import { CreateRemixProjectDto } from "./dto/create-remix-project.dto";
import { UpdateRemixProjectDto } from "./dto/update-remix-project.dto";
import { RemixService } from "./remix.service";

@Controller("remix")
@UseGuards(AccessTokenGuard)
export class RemixController {
  constructor(private readonly remixService: RemixService) {}

  @Get("projects")
  listProjects(@CurrentUser() user: AuthenticatedUser) {
    return this.remixService.listProjects(user);
  }

  @Get("projects/:id")
  getProject(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.remixService.getProject(user, id);
  }

  @Post("projects")
  createProject(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateRemixProjectDto) {
    return this.remixService.createProject(user, dto);
  }

  @Patch("projects/:id")
  updateProject(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string, @Body() dto: UpdateRemixProjectDto) {
    return this.remixService.updateProject(user, id, dto);
  }

  @Post("projects/:id/process")
  processProject(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.remixService.processProject(user, id);
  }

  @Get("projects/:id/preview")
  async preview(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string, @Res() response: Response) {
    return response.sendFile(await this.remixService.resolvePreview(user, id));
  }

  @Get("projects/:id/download")
  async download(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string, @Res() response: Response) {
    const file = await this.remixService.resolveDownload(user, id);
    return response.download(file.path, file.filename);
  }

  @Delete("projects/:id")
  deleteProject(@CurrentUser() user: AuthenticatedUser, @Param("id") id: string) {
    return this.remixService.deleteProject(user, id);
  }
}
