import { useState } from "react";
import {
  Star,
  GitFork,
  Clock3,
  ChevronDown,
  ChevronUp
} from "lucide-react";

function RepoCard({ repo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden">
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {repo.name}
            </h2>

            <p className="text-zinc-400 mt-1">
              {repo.description || "No description available"}
            </p>
          </div>

          {isOpen ? (
            <ChevronUp className="text-zinc-400" size={20} />
          ) : (
            <ChevronDown className="text-zinc-400" size={20} />
          )}
        </div>

        <div className="flex flex-wrap gap-6 mt-3 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>{repo.language || "Unknown"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star size={16} />
            {repo.stargazers_count}
          </div>

          <div className="flex items-center gap-1">
            <GitFork size={16} />
            {repo.forks_count}
          </div>

          <div className="flex items-center gap-1">
            <Clock3 size={16} />
            {new Date(repo.updated_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-zinc-700 px-5 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            <div className="flex flex-col">
              <p className="text-zinc-500 text-sm">
                Default branch
              </p>
              <p className="text-white font-semibold">
                {repo.default_branch}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Open issues
              </p>
              <p className="text-white font-semibold">
                {repo.open_issues_count}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Forks
              </p>
              <p className="text-white font-semibold">
                {repo.forks_count}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                License
              </p>
              <p className="text-white font-semibold">
                {repo.license?.spdx_id || "None"}
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600"
            >
              View Repository
            </a>

            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RepoCard;