import React, { useEffect, useState } from 'react';
import { CharacterList } from '@components/templates';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Characters, GetCharacters, ResponseInfo } from '@/interface';
import { getCharacters } from './api/fetch-data';

// Define a type for our props
interface Props {
  data: GetCharacters;
}

export default function Home({ data }: Props) {
  // Context & Hooks
  const router = useRouter();

  // State
  const [info, setInfo] = useState<ResponseInfo>({
    count: 0,
    pages: 1,
    next: null,
    prev: null,
  });
  const [characters, setCharacters] = useState<Characters>(data.results);

  // Function
  // Default sets of function
  const onLoad = () => { }; // Do something later on
  const onUnload = () => { }; // Do something later on
  
  // Custom functions
  // Fetch data from the API
  const fetchNextData = async (page: number) => {
    try {
      // Fetch character data from an internal API to render content on the server
      const newData = await getCharacters(page);

      // Set data to the page states
      if (newData && (newData.info || newData.results)) {
        // Set the info state
        setInfo({
          count: newData.info.count,
          pages: newData.info.pages,
          next: newData.info.next,
          prev: newData.info.prev,
        });

        const mergeData = [...characters, ...newData.results];
        setCharacters(mergeData);
      }
      return newData;
    } catch (error) {
      // Throw it in the console if there's an error
      return {
        error: 'Internal Error',
      };
    }
  };

  // On click of the next button
  // const onNext = () => {
  //   // If the next button is not null
  //   if (info.next !== null) {
  //     // Fetch the next set of data
  //     router.push(`/`, `/?page=${info.next}`, { shallow: true });
  //   }
  // }

  // On scroll to last element fetch new data
  const handleScroll = () => {
    // If the next button is not null
    if (info.next !== null) {
      // Get the last element
      const lastElement = document.querySelector(
        '.character-list > .character-list-item:last-child',
      ) as HTMLElement;
      // If the last element is not null
      if (lastElement !== null) {
        // Get the last element's position
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        // Get the page's height
        const pageOffset = window.pageYOffset + window.innerHeight;
        // If the last element's position is less than or equal to the page's height
        if (pageOffset >= lastElementOffset) {
          // Fetch the next set of data
          router.push('/', `/?page=${info.next}`, { shallow: true });
          fetchNextData(info.next ?? 1);
        }
      }
    }
  };

  // Hooks
  // Default page hook
  useEffect(() => {
    onLoad();
    return () => {
      onUnload();
    };
  }, []);

  // Set the info state
  useEffect(() => {
    // If there's data
    if (data && (data.info || data.results)) {
      // Set the info state
      setInfo({
        count: data.info.count,
        pages: data.info.pages,
        next: data.info.next,
        prev: data.info.prev,
      });
      setCharacters(data.results);
    }
    // Do not include characters into dependency array as it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // On scroll to last element fetch new data
  useEffect(() => {
    // If the next button is not null
    if (info.next !== null) {
      // Add event listener to the window
      window.addEventListener('scroll', handleScroll);
    }
    // Remove event listener to the window
    return () => window.removeEventListener('scroll', handleScroll);
    // No need to include handleScroll into dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.next]);

  // Render
  return (
    <>
      <section
        className="d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
        data-aos="fade"
        data-aos-delay="1500"
      >
        <div className="container-fluid py-5 bg-body-tertiary">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2>
                <span>Jenny Wilson</span>
                {' '}
                a Professional Photographer from New
                York City
              </h2>
              <p>
                Blanditiis praesentium aliquam illum tempore incidunt debitis
                dolorem magni est deserunt sed qui libero. Qui voluptas amet.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <CharacterList characters={characters} />
        </div>
      </section>
    </>
  );
}

// Export the getServerSideProps function with response data type GetCharacters
export const getServerSideProps: GetServerSideProps<{
  data: GetCharacters;
}> = async ({ query }) => {
  try {
    // Get query params
    const { page } = query;

    // Fetch character data from an internal API to render content on the server
    const data = await getCharacters(parseInt(page as string, 10));

    // Pass data to the page via props
    return { props: { data } };
  } catch (error) {
    // Throw it in the console if there's an error
    return {
      props: {
        data: {
          error: 'Internal Error',
        },
      },
    };
  }
};
