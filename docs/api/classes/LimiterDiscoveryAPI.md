[**bandcamp-fetch**](../README.md) • **Docs**

***

[bandcamp-fetch](../README.md) / LimiterDiscoveryAPI

# Class: LimiterDiscoveryAPI

## Extends

- [`DiscoveryAPI`](DiscoveryAPI.md)

## Constructors

### new LimiterDiscoveryAPI()

> **new LimiterDiscoveryAPI**(`params`): [`LimiterDiscoveryAPI`](LimiterDiscoveryAPI.md)

#### Parameters

• **params**: [`BaseAPIWithImageSupportParams`](../interfaces/BaseAPIWithImageSupportParams.md) & `object`

#### Returns

[`LimiterDiscoveryAPI`](LimiterDiscoveryAPI.md)

#### Overrides

[`DiscoveryAPI`](DiscoveryAPI.md).[`constructor`](DiscoveryAPI.md#constructors)

#### Defined in

[lib/discovery/DiscoveryAPI.ts:149](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/discovery/DiscoveryAPI.ts#L149)

## Accessors

### cache

#### Get Signature

> **get** `protected` **cache**(): [`Cache`](Cache.md)

##### Returns

[`Cache`](Cache.md)

#### Inherited from

[`DiscoveryAPI`](DiscoveryAPI.md).[`cache`](DiscoveryAPI.md#cache)

#### Defined in

[lib/common/BaseAPI.ts:27](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/common/BaseAPI.ts#L27)

***

### imageAPI

#### Get Signature

> **get** **imageAPI**(): [`ImageAPI`](ImageAPI.md)

##### Returns

[`ImageAPI`](ImageAPI.md)

#### Inherited from

[`DiscoveryAPI`](DiscoveryAPI.md).[`imageAPI`](DiscoveryAPI.md#imageapi)

#### Defined in

[lib/common/BaseAPIWithImageSupport.ts:17](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/common/BaseAPIWithImageSupport.ts#L17)

## Methods

### discover()

> **discover**(`params`): `Promise`\<[`DiscoverResult`](../interfaces/DiscoverResult.md)\>

#### Parameters

• **params**: [`DiscoverParams`](../interfaces/DiscoverParams.md)

#### Returns

`Promise`\<[`DiscoverResult`](../interfaces/DiscoverResult.md)\>

#### Overrides

[`DiscoveryAPI`](DiscoveryAPI.md).[`discover`](DiscoveryAPI.md#discover)

#### Defined in

[lib/discovery/DiscoveryAPI.ts:162](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/discovery/DiscoveryAPI.ts#L162)

***

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

[`DiscoveryAPI`](DiscoveryAPI.md).[`fetch`](DiscoveryAPI.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:20](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/common/BaseAPI.ts#L20)

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

[`DiscoveryAPI`](DiscoveryAPI.md).[`fetch`](DiscoveryAPI.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:21](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/common/BaseAPI.ts#L21)

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

[`DiscoveryAPI`](DiscoveryAPI.md).[`fetch`](DiscoveryAPI.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:22](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/common/BaseAPI.ts#L22)

***

### getAvailableOptions()

> **getAvailableOptions**(): `Promise`\<[`DiscoverOptions`](../interfaces/DiscoverOptions.md)\>

#### Returns

`Promise`\<[`DiscoverOptions`](../interfaces/DiscoverOptions.md)\>

#### Overrides

[`DiscoveryAPI`](DiscoveryAPI.md).[`getAvailableOptions`](DiscoveryAPI.md#getavailableoptions)

#### Defined in

[lib/discovery/DiscoveryAPI.ts:154](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/discovery/DiscoveryAPI.ts#L154)

***

### sanitizeDiscoverParams()

> **sanitizeDiscoverParams**(`params`): `Promise`\<[`SanitizedDiscoverParams`](../type-aliases/SanitizedDiscoverParams.md)\>

#### Parameters

• **params**: [`DiscoverParams`](../interfaces/DiscoverParams.md)

#### Returns

`Promise`\<[`SanitizedDiscoverParams`](../type-aliases/SanitizedDiscoverParams.md)\>

#### Overrides

[`DiscoveryAPI`](DiscoveryAPI.md).[`sanitizeDiscoverParams`](DiscoveryAPI.md#sanitizediscoverparams)

#### Defined in

[lib/discovery/DiscoveryAPI.ts:158](https://github.com/patrickkfkan/bandcamp-fetch/blob/be622bf87b8ac66e98b356306b6a650b7972970c/src/lib/discovery/DiscoveryAPI.ts#L158)
