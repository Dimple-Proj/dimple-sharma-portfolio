import type { Project } from '../config/projects';
import { ArrowUpRight, GitHub, Lock } from './Icons';

/**
 * GitHub / demo buttons for a project. Buttons only render when a real URL
 * exists in the config; private work shows a small "private" label instead.
 */
export function ProjectLinks({ project, size = 'sm' }: { project: Project; size?: 'sm' | 'md' }) {
  const pad = size === 'sm' ? '!min-h-11 !px-4 !py-2 text-sm' : '';
  const { github, demo } = project.links;

  return (
    <>
      {github && (
        <a href={github} target="_blank" rel="noreferrer noopener" className={`btn btn-ghost ${pad}`}>
          <GitHub /> GitHub
          <span className="sr-only"> repository for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer noopener" className={`btn btn-ghost ${pad}`}>
          Live demo <ArrowUpRight />
          <span className="sr-only"> of {project.title} (opens in a new tab)</span>
        </a>
      )}
      {!github && project.privateNote && (
        <span className="inline-flex items-center gap-2 text-sm text-mute" title={project.privateNote}>
          <Lock width={15} height={15} /> Private
          <span className="sr-only">: {project.privateNote}</span>
        </span>
      )}
    </>
  );
}
