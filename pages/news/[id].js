import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { gql, useQuery } from "@apollo/client";
import client from "../../libs/apollo";

export default function Single({ post }) {
  const { id, title, content, image, createdAt, comments } = post
  return (
    <>
      <Head>
        <title>{`Course | ${title}`}</title>
      </Head>
      <h1>{title} #{id}</h1>
      <p>{content}</p>
    </>
  )
}

export async function getStaticProps({ params: { id } }) {
  const { data: { post } } = await client.query({
    query: gql`
      query($id: Int){
        post(id: $id) {
          id
          title
          image
          content
          createdAt
          comments {
            id
            content
            createdAt
          }
        }
      }
    `,
    variables: { id: +id },
  });

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Posts($limit: Int) {
        posts(pagination: { limit: $limit }) {
          id
          title
          content
        }
      }
    `,
    variables: { limit: -1 },
  });

  const paths = data.posts.map(post => ({
    params: { id: post.id.toString() }
  }))

  return {
    fallback: false,
    paths
  }
}