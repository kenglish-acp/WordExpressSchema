import {map} from 'lodash'

export default function (TermRelationships, Post){
  return function(termId, { limit = 10, skip = 0 }) {
    return TermRelationships.findAll({
      attributes: [],
      include: [{
        model: Post,
        where: {
          post_status: 'publish'
        }
      }],
      where: {
        term_taxonomy_id: termId
      },
      limit: limit,
      offset: skip
    }).then(posts => {
      const p = map(posts, post => post.wp_post)
      return p
    })
  }
}