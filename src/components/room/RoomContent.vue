<template>
  <div class="row" style="padding: 45px;">
    <video id="room-video">
      <source
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        type="video/mp4"
      />
    </video>
    <div id="room-content" class="col">
      <div class="card">
        <div class="content-watching container">
          <img
            src="https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_.jpg"
            alt="The Imitation Game"
          />
          <div class="watching-description">
            <div class="watching-title">
              The Imitation Game
              <a href="" class="edit-title-icon">
                <font-awesome-icon icon="pencil-alt" />
              </a>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              commodi consequatur consequuntur dolor eos fuga illum in incidunt
              itaque labore minima minus necessitatibus nostrum reiciendis...
            </p>
            <div class="watching-metadata"><b>Year:</b> 2014</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h3>People watching</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomContent"
};
</script>

<style lang="scss" scoped>
#room-video {
  width: 100%;
  border-radius: $card-border-radius;
}

#room-title {
  margin-top: 0;
  margin-bottom: $container-spacing;
}

#room-content {
  display: flex;

  > .card {
    flex: 1;
  }
}

.content-watching {
  display: flex;
  flex-flow: row;

  img {
    max-height: 120px;
    vertical-align: top;
    margin-right: 10px;
  }

  .watching-description {
    .watching-title {
      font-weight: bold;
      color: $title-on-bg;

      .edit-title-icon {
        margin-left: 10px;
        font-size: smaller;
      }
    }

    p {
      margin-top: 0;
      margin-bottom: 5px;
      font-size: smaller;
    }

    .watching-metadata {
      font-size: smaller;

      b {
        color: $title-on-bg;
      }
    }
  }
}
</style>
