import React from 'react'
import AlbumCard from './AlbumCard'
import { Row, Col } from 'react-bootstrap'
import {connect} from 'react-redux'
import { getSongsAction } from '../redux/actions'

const mapStateToProps =(state)=> ({
  songs:state.song.songs,
  searchQuery:state.song.searchQuery
})

const mapDispatchToProps =(dispatch)=> ({
  getSongs:(artistName, category)=> {
    dispatch(getSongsAction(artistName, category))
  }
})
 
class Home extends React.Component {
  state = {
    rockSongs: [],
    popSongs: [],
    hipHopSongs: [],
  }

  rockArtists = [
    'queen',
    'u2',
    'thepolice',
    'eagles',
    'thedoors',
    'oasis',
    'thewho',
    'bonjovi',
  ]

  popArtists = [
    'arianagrande',
    'maroon5',
    'onerepublic',
    'coldplay',
    'katyperry',
  ]

  hipHopArtists = ['eminem', 'snoopdogg', 'lilwayne', 'drake', 'kanyewest']

  handleArtist = async (artistName, category) => {
    this.props.getSongs(artistName, category)
  }

  componentDidMount = async () => {
    let rockRandomArtists = []
    let popRandomArtists = []
    let hipHopRandomArtists = []

    while (rockRandomArtists.length < 4) {
      let artist =
        this.rockArtists[Math.floor(Math.random() * this.rockArtists.length)]
      if (!rockRandomArtists.includes(artist)) {
        rockRandomArtists.push(artist)
      }
    }

    while (popRandomArtists.length < 4) {
      let artist =
        this.popArtists[Math.floor(Math.random() * this.popArtists.length)]
      if (!popRandomArtists.includes(artist)) {
        popRandomArtists.push(artist)
      }
    }

    while (hipHopRandomArtists.length < 4) {
      let artist =
        this.hipHopArtists[
          Math.floor(Math.random() * this.hipHopArtists.length)
        ]
      if (!hipHopRandomArtists.includes(artist)) {
        hipHopRandomArtists.push(artist)
      }
    }

    for (let j = 0; j < rockRandomArtists.length; j++)
      await this.handleArtist(rockRandomArtists[j], 'rockSongs')

    for (let k = 0; k < popRandomArtists.length; k++)
      await this.handleArtist(popRandomArtists[k], 'popSongs')

    for (let l = 0; l < hipHopRandomArtists.length; l++)
      await this.handleArtist(hipHopRandomArtists[l], 'hipHopSongs')
  }

  render() {
    return (
      <Col className='col-12 col-md-9 offset-md-3 mainPage'>
        <Row>
          <div className='col-9 col-lg-11 mainLinks d-none d-md-flex'>
            <div>TRENDING</div>
            <div>PODCAST</div>
            <div>MOODS AND GENRES</div>
            <div>NEW RELEASES</div>
            <div>DISCOVER</div>
          </div>
        </Row>
        {this.props.searchQuery && this.props.songs.length > 0 && (
          <Row>
            <Col xs={10}>
              <div id='searchResults'>
                <h2>Search Results</h2>
                <Row className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'>
                  {this.props.songs.map((song) => (
                    <AlbumCard song={song} key={song.id} />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        )}
        {this.props.searchResults.length === 0 && (
          <>
            <Row>
              <Col xs={10}>
                <div id='rock'>
                  <h2>Rock Classics</h2>
                  <Row
                    className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'
                    id='rockSection'
                  >
                    {this.props.songs.map((song) => (
                      <AlbumCard song={song} key={song?.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <div id='pop'>
                  <h2>Pop Culture</h2>
                  <Row
                    className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'
                    id='popSection'
                  >
                    {this.props.songs.map((song) => (
                      <AlbumCard song={song} key={song?.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <div id='hiphop'>
                  <h2>#HipHop</h2>
                  <Row
                    className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'
                    id='hipHopSection'
                  >
                    {this.props.songs.map((song) => (
                      <AlbumCard song={song} key={song?.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Col>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
