# Release policy

## Pilot

Pilot releases are unsigned test distributions for designated acceptance
computers. They require exact source-SHA binding, package-content inspection,
SHA-256 manifests and explicit operator confirmation.

## Staged

Staged releases are published only by the guarded source-repository workflow.
Pilot 2 requires owner-supplied PC-2 Pilot 1 evidence.

## Stable

Stable releases require real Windows signing, signature verification, complete
external acceptance, rollback evidence and explicit owner approval. Unsigned or
unapproved Stable publication is prohibited.

Release tags point to safe release-ledger commits containing manifests and
checksums, never application source code.