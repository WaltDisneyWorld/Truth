import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

import reducer from '../instance';

describe('instance reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(ImmutableMap({
      max_toot_chars: 500,
      description_limit: 1500,
      poll_limits: ImmutableMap({
        max_expiration: 2629746,
        max_option_chars: 25,
        max_options: 4,
        min_expiration: 300,
      }),
      configuration: ImmutableMap({
        media_attachments: ImmutableMap({
          supported_mime_types: ImmutableList([
            'image/jpeg',
            'image/png',
            'image/gif',
            'video/webm',
            'video/mp4',
            'video/quicktime',
            'video/ogg',
            'audio/wave',
            'audio/wav',
            'audio/x-wav',
            'audio/x-pn-wave',
            'audio/ogg',
            'audio/vorbis',
            'audio/mpeg',
            'audio/mp3',
            'audio/webm',
            'audio/flac',
            'audio/aac',
            'audio/m4a',
            'audio/x-m4a',
            'audio/mp4',
            'audio/3gpp',
            'video/x-ms-asf',
          ]),
        }),
      }),
      version: '0.0.0',
    }));
  });
});
