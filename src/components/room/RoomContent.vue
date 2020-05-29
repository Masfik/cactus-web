<template>
  <div class="row" id="video-container">
    <card>
      <video controls id="room-video">
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          type="video/mp4"
        />
      </video>
      <div class="container">
        <editable id="watching-title">
          <h3>The Imitation Game</h3>
        </editable>
        <div id="watching-description">
          <img
            src="https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_.jpg"
            alt="The Imitation Game"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            commodi consequatur consequuntur dolor eos fuga illum in incidunt
            itaque labore minima minus necessitatibus nostrum reiciendis...
            <span> <b>Year:</b> 2014 </span>
            <span> <b>Length:</b> 1 hour </span>
          </p>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "@/components/common/Card";
import Editable from "@/components/common/Editable";
export default {
  name: "RoomContent",
  components: { Editable, Card }
};
</script>

<style lang="scss" scoped>
#video-container {
  padding: 60px;
}

#room-video {
  width: 100%;
  border-radius: $s-card-border-radius;

  &:focus {
    outline: none;
  }
}

#watching-title {
  width: 100%;
  margin-bottom: $s-container-spacing;

  > *:first-child {
    @extend %text-ellipsis;
    max-width: $s-room-video-min-width - $s-card-container-spacing;
    margin-top: 0;
    margin-bottom: 0;
  }
}

#watching-description {
  display: flex;
  flex-flow: row;

  img {
    max-height: $s-poster-image-height;
    margin-right: 10px;
    border-radius: $s-card-border-radius;
  }

  p {
    margin-top: 0;
    font-size: smaller;

    > :first-child {
      margin-top: 8px;
    }

    span {
      display: block;
      margin-block-start: 4px;

      b {
        color: var(--c-text-on-bg);
      }
    }
  }
}
</style>
