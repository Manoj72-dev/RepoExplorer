function LoadingSkeleton(){
    return(
        <div className="bg-zinc-950 h-[calc(100vh_-_190px)] w-screen m-3  rounded-2xl " >
            <div className="bg-zinc-950 grid grid-cols-1 min-[1000px]:grid-cols-[35%_65%] gap-4 h-full">
                <div className="bg-zinc-950  rounded-2xl ">
                    <div className="flex flex-col h-full gap-4 ">
                        <div className="bg-zinc-800 animate-pulse rounded-2xl h-full">
                            <div className="h-30 w-30 rounded-full">

                            </div>
                        </div>
                        <div className=" flex flex-col gap-4 h-full">
                            <div className="bg-zinc-800 animate-pulse rounded-2xl h-full">

                            </div>
                            <div className="bg-zinc-800 animate-pulse rounded-2xl h-full">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-800 p-4 animate-pulse rounded-2xl">

                </div>
            </div>
        </div>
    );
}

export default LoadingSkeleton