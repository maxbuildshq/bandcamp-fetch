[**bandcamp-fetch**](../README.md) • **Docs**

***

[bandcamp-fetch](../README.md) / LimiterTagAPI

# Class: LimiterTagAPI

## Extends

- [`TagAPI`](TagAPI.md)

## Constructors

### new LimiterTagAPI()

> **new LimiterTagAPI**(`params`): [`LimiterTagAPI`](LimiterTagAPI.md)

#### Parameters

• **params**: [`BaseAPIWithImageSupportParams`](../interfaces/BaseAPIWithImageSupportParams.md) & `object`

#### Returns

[`LimiterTagAPI`](LimiterTagAPI.md)

#### Overrides

[`TagAPI`](TagAPI.md).[`constructor`](TagAPI.md#constructors)

#### Defined in

[lib/tag/TagAPI.ts:37](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/tag/TagAPI.ts#L37)

## Accessors

### cache

#### Get Signature

> **get** `protected` **cache**(): [`Cache`](Cache.md)

##### Returns

[`Cache`](Cache.md)

#### Inherited from

[`TagAPI`](TagAPI.md).[`cache`](TagAPI.md#cache)

#### Defined in

[lib/common/BaseAPI.ts:27](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPI.ts#L27)

***

### imageAPI

#### Get Signature

> **get** **imageAPI**(): [`ImageAPI`](ImageAPI.md)

##### Returns

[`ImageAPI`](ImageAPI.md)

#### Inherited from

[`TagAPI`](TagAPI.md).[`imageAPI`](TagAPI.md#imageapi)

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

[`TagAPI`](TagAPI.md).[`fetch`](TagAPI.md#fetch)

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

[`TagAPI`](TagAPI.md).[`fetch`](TagAPI.md#fetch)

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

[`TagAPI`](TagAPI.md).[`fetch`](TagAPI.md#fetch)

##### Defined in

[lib/common/BaseAPI.ts:22](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/common/BaseAPI.ts#L22)

***

### getRelated()

> **getRelated**(`params`): `Promise`\<[`RelatedTags`](../interfaces/RelatedTags.md)\>

#### Parameters

• **params**: [`TagAPIGetRelatedParams`](../interfaces/TagAPIGetRelatedParams.md)

#### Returns

`Promise`\<[`RelatedTags`](../interfaces/RelatedTags.md)\>

#### Inherited from

[`TagAPI`](TagAPI.md).[`getRelated`](TagAPI.md#getrelated)

#### Defined in

[lib/tag/TagAPI.ts:22](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/tag/TagAPI.ts#L22)

***

### list()

> **list**(): `Promise`\<[`TagList`](../interfaces/TagList.md)\>

#### Returns

`Promise`\<[`TagList`](../interfaces/TagList.md)\>

#### Overrides

[`TagAPI`](TagAPI.md).[`list`](TagAPI.md#list)

#### Defined in

[lib/tag/TagAPI.ts:42](https://github.com/patrickkfkan/bandcamp-fetch/blob/d7908af6ae5080a27ddea05f2631b8fc5129d64d/src/lib/tag/TagAPI.ts#L42)
