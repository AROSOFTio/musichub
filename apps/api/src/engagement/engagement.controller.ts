import { Controller, Post, Delete, Get, Param, Body, UseGuards, Put } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { CurrentUser, AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { CreatePlaylistDto, AddSongToPlaylistDto, CreateCommentDto } from './dto/engagement.dto';
import { FeatureModulesService } from '../feature-modules/feature-modules.service';

@Controller('engagement')
export class EngagementController {
  constructor(
    private readonly engagementService: EngagementService,
    private readonly featureModules: FeatureModulesService,
  ) {}

  // LIKES
  @UseGuards(AccessTokenGuard)
  @Post('likes/:songId')
  async likeSong(@CurrentUser() user: AuthenticatedUser, @Param('songId') songId: string) {
    await this.featureModules.assertEnabled("likes", "api");
    return this.engagementService.likeSong(user.userId, songId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('likes/:songId')
  async unlikeSong(@CurrentUser() user: AuthenticatedUser, @Param('songId') songId: string) {
    await this.featureModules.assertEnabled("likes", "api");
    return this.engagementService.unlikeSong(user.userId, songId);
  }

  // FAVORITES
  @UseGuards(AccessTokenGuard)
  @Post('favorites/:songId')
  async addFavorite(@CurrentUser() user: AuthenticatedUser, @Param('songId') songId: string) {
    await this.featureModules.assertEnabled("favorites", "api");
    return this.engagementService.addFavorite(user.userId, songId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('favorites/:songId')
  async removeFavorite(@CurrentUser() user: AuthenticatedUser, @Param('songId') songId: string) {
    await this.featureModules.assertEnabled("favorites", "api");
    return this.engagementService.removeFavorite(user.userId, songId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('favorites')
  async getFavorites(@CurrentUser() user: AuthenticatedUser) {
    await this.featureModules.assertEnabled("favorites", "api");
    return this.engagementService.getFavorites(user.userId);
  }

  // PLAYLISTS
  @UseGuards(AccessTokenGuard)
  @Post('playlists')
  async createPlaylist(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreatePlaylistDto) {
    await this.featureModules.assertEnabled("playlists", "api");
    return this.engagementService.createPlaylist(user.userId, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('playlists')
  async getUserPlaylists(@CurrentUser() user: AuthenticatedUser) {
    await this.featureModules.assertEnabled("playlists", "api");
    return this.engagementService.getUserPlaylists(user.userId);
  }

  // Allow anonymous access if playlist is public (checked in service)
  @Get('playlists/:id')
  async getPlaylist(@Param('id') id: string, @CurrentUser() user?: AuthenticatedUser) {
    await this.featureModules.assertEnabled("playlists", "api");
    return this.engagementService.getPlaylist(id, user?.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('playlists/:id/songs')
  async addSongToPlaylist(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') playlistId: string,
    @Body() dto: AddSongToPlaylistDto,
  ) {
    await this.featureModules.assertEnabled("playlists", "api");
    return this.engagementService.addSongToPlaylist(user.userId, playlistId, dto.songId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('playlists/:id/songs/:songId')
  async removeSongFromPlaylist(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') playlistId: string,
    @Param('songId') songId: string,
  ) {
    await this.featureModules.assertEnabled("playlists", "api");
    return this.engagementService.removeSongFromPlaylist(user.userId, playlistId, songId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('playlists/:id')
  async deletePlaylist(@CurrentUser() user: AuthenticatedUser, @Param('id') playlistId: string) {
    await this.featureModules.assertEnabled("playlists", "api");
    return this.engagementService.deletePlaylist(user.userId, playlistId);
  }

  // FOLLOWS
  @UseGuards(AccessTokenGuard)
  @Post('follows/:artistId')
  async followArtist(@CurrentUser() user: AuthenticatedUser, @Param('artistId') artistId: string) {
    await this.featureModules.assertEnabled("follows", "api");
    return this.engagementService.followArtist(user.userId, artistId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('follows/:artistId')
  async unfollowArtist(@CurrentUser() user: AuthenticatedUser, @Param('artistId') artistId: string) {
    await this.featureModules.assertEnabled("follows", "api");
    return this.engagementService.unfollowArtist(user.userId, artistId);
  }

  // HISTORY
  @UseGuards(AccessTokenGuard)
  @Post('history/:songId')
  async recordPlayHistory(@CurrentUser() user: AuthenticatedUser, @Param('songId') songId: string) {
    await this.featureModules.assertEnabled("recently_played", "api");
    return this.engagementService.recordPlayHistory(user.userId, songId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('history')
  async getPlayHistory(@CurrentUser() user: AuthenticatedUser) {
    await this.featureModules.assertEnabled("recently_played", "api");
    return this.engagementService.getPlayHistory(user.userId);
  }

  // COMMENTS
  @UseGuards(AccessTokenGuard)
  @Post('comments/:songId')
  async addComment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('songId') songId: string,
    @Body() dto: CreateCommentDto,
  ) {
    await this.featureModules.assertEnabled("comments", "api");
    return this.engagementService.addComment(user.userId, songId, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('comments/:id')
  async deleteComment(@CurrentUser() user: AuthenticatedUser, @Param('id') commentId: string) {
    await this.featureModules.assertEnabled("comments", "api");
    return this.engagementService.deleteComment(user.userId, commentId);
  }

  @Get('comments/:songId')
  async getSongComments(@Param('songId') songId: string) {
    await this.featureModules.assertEnabled("comments", "api");
    return this.engagementService.getSongComments(songId);
  }

  // NOTIFICATIONS
  @UseGuards(AccessTokenGuard)
  @Get('notifications')
  async getNotifications(@CurrentUser() user: AuthenticatedUser) {
    await this.featureModules.assertEnabled("notifications", "api");
    return this.engagementService.getNotifications(user.userId);
  }

  @UseGuards(AccessTokenGuard)
  @Put('notifications/:id/read')
  async markNotificationRead(@CurrentUser() user: AuthenticatedUser, @Param('id') notificationId: string) {
    await this.featureModules.assertEnabled("notifications", "api");
    return this.engagementService.markNotificationRead(user.userId, notificationId);
  }
}
