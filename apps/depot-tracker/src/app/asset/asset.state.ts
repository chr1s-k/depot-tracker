import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Asset } from './asset.class';
import { AssetService } from './asset.service';
import {
  AssetCreate,
  AssetCreateKeep,
  AssetDelete,
  AssetGet,
} from './asset.actions';
import { map } from 'rxjs/operators';
import { CreateAssetDto } from '@chris-k-software/api-interfaces';

export class AssetStateModel {
  assets: Asset[];
  highlight: Asset[];
  createAssetState: CreateAssetDto;
}

@State<AssetStateModel>({
  name: 'asset',
  defaults: {
    assets: [],
    highlight: [],
    createAssetState: undefined,
  },
})
@Injectable()
export class AssetState implements NgxsOnInit {
  constructor(private assetService: AssetService) {}

  ngxsOnInit({ dispatch }: StateContext<AssetStateModel>): void {
    console.log('State initialized, now getting assets');
    dispatch(new AssetGet());
  }

  @Selector([AssetState])
  static getAssets(state: AssetStateModel) {
    return state.assets;
  }

  @Selector([AssetState])
  static getCreateAssetState(state: AssetStateModel) {
    return state.createAssetState;
  }

  @Selector([AssetState])
  static highlight(state: AssetStateModel) {
    return state.highlight;
  }

  @Selector([AssetState.highlight])
  static highlightById(
    state: AssetState,
    highlight: Asset[]
  ): Record<string, true> {
    return highlight.reduce((h, obj) => {
      h[obj.id] = true;
      return h;
    }, {});
  }

  @Action(AssetCreate, { cancelUncompleted: true })
  create(
    { patchState, getState }: StateContext<AssetStateModel>,
    { createAssetDto }: AssetCreate
  ) {
    const state = getState();
    return this.assetService.create$(createAssetDto).pipe(
      map((newAsset) =>
        patchState({
          assets: [...[newAsset], ...state.assets],
          highlight: [...[newAsset]],
        })
      )
    );
  }

  @Action(AssetDelete)
  remove(
    { getState, patchState }: StateContext<AssetStateModel>,
    { asset }: AssetDelete
  ) {
    const state = getState();
    return this.assetService.delete$(asset.id).pipe(
      map((deleteResult) => {
        if (deleteResult.affected === 1) {
          patchState({
            assets: [
              ...state.assets.filter((curAsset) => curAsset.id !== asset.id),
            ],
          });
        } else {
          throw new Error('Asset could not be removed.');
        }
      })
    );
  }

  @Action(AssetGet)
  all({ patchState }: StateContext<AssetStateModel>) {
    return this.assetService
      .all$()
      .pipe(map((assets) => patchState({ assets: assets })));
  }

  @Action(AssetCreateKeep)
  keep(
    { patchState }: StateContext<AssetStateModel>,
    { createAssetState }: AssetCreateKeep
  ) {
    patchState({ createAssetState });
  }
}
