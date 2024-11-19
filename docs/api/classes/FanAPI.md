[**bandcamp-fetch**](../README.md) • **Docs**

***

[bandcamp-fetch](../README.md) / FanAPI

# Class: FanAPI

## Extends

- [`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md)

## Extended by

- [`LimiterFanAPI`](LimiterFanAPI.md)

## Constructors

### new FanAPI()

> **new FanAPI**(`params`): [`FanAPI`](FanAPI.md)

#### Parameters

• **params**: [`BaseAPIWithImageSupportParams`](../interfaces/BaseAPIWithImageSupportParams.md)

#### Returns

[`FanAPI`](FanAPI.md)

#### Inherited from

[`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md).[`constructor`](BaseAPIWithImageSupport.md#constructors)

#### Defined in

[lib/common/BaseAPIWithImageSupport.ts:12](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPIWithImageSupport.ts#L12)

## Accessors

### cache

#### Get Signature

> **get** `protected` **cache**(): [`Cache`](Cache.md)

##### Returns

[`Cache`](Cache.md)

#### Inherited from

[`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md).[`cache`](BaseAPIWithImageSupport.md#cache)

#### Defined in

[lib/common/BaseAPI.ts:27](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPI.ts#L27)

***

### imageAPI

#### Get Signature

> **get** **imageAPI**(): [`ImageAPI`](ImageAPI.md)

##### Returns

[`ImageAPI`](ImageAPI.md)

#### Inherited from

[`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md).[`imageAPI`](BaseAPIWithImageSupport.md#imageapi)

#### Defined in

[lib/common/BaseAPIWithImageSupport.ts:17](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPIWithImageSupport.ts#L17)

## Methods

### fetch()

#### fetch(url, jsonResponse, method, payload)

> `protected` **fetch**(`url`, `jsonResponse`, `method`, `payload`?): `Promise`\<`object`\>

##### Parameters

• **url**: `string`

• **jsonResponse**: `false`

• **method**: [`HEAD`](../enumerations/FetchMethod.md#head)

• **payload?**: `undefined`

##### Returns

`Promise`\<`object`\>

###### ok

> **ok**: `boolean`

###### status

> **status**: `number`

##### Inherited from

[`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md).[`fetch`](BaseAPIWithImageSupport.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:20](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPI.ts#L20)

#### fetch(url, jsonResponse, method, payload)

> `protected` **fetch**(`url`, `jsonResponse`, `method`?, `payload`?): `Promise`\<`any`\>

##### Parameters

• **url**: `string`

• **jsonResponse**: `true`

• **method?**: [`FetchMethod`](../enumerations/FetchMethod.md)

• **payload?**: `Record`\<`string`, `any`\>

##### Returns

`Promise`\<`any`\>

##### Inherited from

[`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md).[`fetch`](BaseAPIWithImageSupport.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:21](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPI.ts#L21)

#### fetch(url, jsonResponse, method, payload)

> `protected` **fetch**(`url`, `jsonResponse`?, `method`?, `payload`?): `Promise`\<`string`\>

##### Parameters

• **url**: `string`

• **jsonResponse?**: `boolean`

• **method?**: [`FetchMethod`](../enumerations/FetchMethod.md)

• **payload?**: `Record`\<`string`, `any`\>

##### Returns

`Promise`\<`string`\>

##### Inherited from

[`BaseAPIWithImageSupport`](BaseAPIWithImageSupport.md).[`fetch`](BaseAPIWithImageSupport.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:22](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPI.ts#L22)

***

### getCollection()

> **getCollection**(`params`): `Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\>\>

#### Parameters

• **params**: [`FanAPIGetItemsParams`](../interfaces/FanAPIGetItemsParams.md)

#### Returns

`Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\>\>

#### Defined in

[lib/fan/FanAPI.ts:60](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/fan/FanAPI.ts#L60)

***

### getFollowingArtistsAndLabels()

> **getFollowingArtistsAndLabels**(`params`): `Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<[`UserKind`](../interfaces/UserKind.md)\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<[`UserKind`](../interfaces/UserKind.md)\>\>

#### Parameters

• **params**: [`FanAPIGetItemsParams`](../interfaces/FanAPIGetItemsParams.md)

#### Returns

`Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<[`UserKind`](../interfaces/UserKind.md)\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<[`UserKind`](../interfaces/UserKind.md)\>\>

#### Defined in

[lib/fan/FanAPI.ts:80](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/fan/FanAPI.ts#L80)

***

### getFollowingGenres()

> **getFollowingGenres**(`params`): `Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<[`Tag`](../interfaces/Tag.md)\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<[`Tag`](../interfaces/Tag.md)\>\>

#### Parameters

• **params**: [`FanAPIGetItemsParams`](../interfaces/FanAPIGetItemsParams.md)

#### Returns

`Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<[`Tag`](../interfaces/Tag.md)\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<[`Tag`](../interfaces/Tag.md)\>\>

#### Defined in

[lib/fan/FanAPI.ts:90](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/fan/FanAPI.ts#L90)

***

### getInfo()

> **getInfo**(`params`): `Promise`\<[`Fan`](../interfaces/Fan.md)\>

#### Parameters

• **params**: [`FanAPIGetInfoParams`](../interfaces/FanAPIGetInfoParams.md)

#### Returns

`Promise`\<[`Fan`](../interfaces/Fan.md)\>

#### Defined in

[lib/fan/FanAPI.ts:42](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/fan/FanAPI.ts#L42)

***

### getWishlist()

> **getWishlist**(`params`): `Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\>\>

#### Parameters

• **params**: [`FanAPIGetItemsParams`](../interfaces/FanAPIGetItemsParams.md)

#### Returns

`Promise`\<[`FanPageItemsResult`](../interfaces/FanPageItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\> \| [`FanContinuationItemsResult`](../interfaces/FanContinuationItemsResult.md)\<`NonNullable`\<`null` \| [`Track`](../interfaces/Track.md) \| [`Album`](../interfaces/Album.md)\>\>\>

#### Defined in

[lib/fan/FanAPI.ts:70](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/fan/FanAPI.ts#L70)
